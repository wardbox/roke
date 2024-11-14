import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash } from "@phosphor-icons/react";
import { deleteNote, updateNote } from "wasp/client/operations";
import { HttpError } from "wasp/server";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "../../components/ui/motion";
import { Skeleton } from "../../components/ui/skeleton";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { NotesProps } from "./example";

export function NoteList(
  { notes, isLoading }: {
    notes: NotesProps["notes"] | undefined;
    isLoading: boolean;
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
      const err = error as HttpError;
      toast({
        title: "Error deleting note",
        description: err.message,
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
      });
    } catch (error) {
      const err = error as HttpError;
      toast({
        title: "Error updating note",
        description: err.message,
      });
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border">
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="text-center p-8 rounded-lg border border-dashed"
      >
        <p className="text-muted-foreground">
          No notes yet. Why not create one?
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {notes.map((note) => (
        <motion.div
          key={note.id}
          variants={fadeInUp}
          layout="position"
          transition={{ layout: { duration: 0.2 } }}
          className="p-6 rounded-lg border hover:bg-muted/50 transition-colors group relative leading-8"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 flex flex-col gap-4">
              {editingNoteId === note.id
                ? (
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
                        <kbd className="px-1 py-0.5 bg-muted rounded-md">⌘
                        </kbd>+<kbd className="px-1 py-0.5 bg-muted rounded-md">
                          Enter
                        </kbd>{" "}
                        to save
                      </span>
                    </div>
                  </div>
                )
                : (
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
                <time>{formatDistanceToNow(new Date(note.createdAt))} ago</time>
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
      ))}
    </motion.div>
  );
}
