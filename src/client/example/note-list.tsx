import { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { deleteNote, updateNote } from "wasp/client/operations";
import { Button } from "../../components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { fadeIn, staggerContainer, staggerItem } from "../../components/ui/motion";
import { Skeleton } from "../../components/ui/skeleton";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { NotesProps } from "./note-example";
import { timeSince, getErrorMessage } from "../../lib/utils";

type Note = NotesProps["notes"][number];

export function NoteList(
  { notes, isLoading, error }: {
    notes: NotesProps["notes"] | undefined;
    isLoading: boolean;
    error: unknown;
  },
) {
  const { toast } = useToast();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  async function handleDelete(id: string) {
    try {
      await deleteNote({ id });
      toast({
        title: "Note deleted",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error deleting note",
        description: getErrorMessage(error),
      });
    }
  }

  async function handleUpdate(id: string) {
    try {
      await updateNote({ id, content: editedContent });
      setEditingNoteId(null);
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error updating note",
        description: getErrorMessage(error),
        variant: "destructive"
      });
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLoading ? 'loading' : 'content'}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        className="space-y-4"
      >
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                custom={2 - i}
                className="p-4 rounded-lg border"
              >
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </motion.div>
            ))}
          </>
        ) : error ? (
          <motion.div
            variants={fadeIn}
            className="text-center p-8 rounded-lg border border-dashed"
          >
            <p className="text-muted-foreground">
              {(error as any)?.message || 'Please sign in to view notes'}
            </p>
          </motion.div>
        ) : !notes || notes.length === 0 ? (
          <motion.div
            variants={fadeIn}
            className="text-center p-8 rounded-lg border border-dashed"
          >
            <p className="text-muted-foreground">
              No notes yet. Why not create one?
            </p>
          </motion.div>
        ) : (
          notes.map((note: Note, i) => (
            <motion.div
              key={note.id}
              variants={staggerItem}
              custom={notes.length - 1 - i}
              layout="position"
              transition={{ layout: { duration: 0.2 } }}
              className="p-6 rounded-lg border hover:bg-muted/50 transition-colors group relative leading-8"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 flex flex-col gap-4">
                  {editingNoteId === note.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setEditingNoteId(null);
                          }
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            handleUpdate(note.id);
                          }
                        }}
                      />
                      <div className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleUpdate(note.id)}
                          className="h-7 px-2 text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingNoteId(null)}
                          className="h-7 px-2 text-xs"
                        >
                          Cancel
                        </Button>
                        <span className="text-xs">
                          Press{" "}
                          <kbd className="px-1 py-0.5 bg-muted rounded-md">⌘</kbd>+
                          <kbd className="px-1 py-0.5 bg-muted rounded-md">Enter</kbd>{" "}
                          to save
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="font-medium mb-2 cursor-pointer hover:text-foreground/80 text-pretty"
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditedContent(note.content);
                      }}
                    >
                      {note.content}
                    </p>
                  )}
                  <div className="text-sm text-muted-foreground text-pretty">
                    <span>By {note.user.username}</span>
                    <span className="mx-2">•</span>
                    <span>updated <time>{timeSince(new Date(note.updatedAt))}</time></span>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                  onClick={() => handleDelete(note.id)}
                  aria-label="Delete note"
                >
                  <Trash weight="bold" className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}
