import * as React from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Link } from "wasp/client/router"
import { BookOpen, HouseSimple, Layout, List, Mountains, PersonSimpleRun, Placeholder, Toolbox, User as UserIcon } from "@phosphor-icons/react"
import { ModeToggle } from "../mode-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { logout } from "wasp/client/auth"
import { type User } from "wasp/entities"
import { Skeleton } from "./skeleton"
import { motion } from "motion/react"
import { fadeIn } from "./motion"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  user?: User | null
  userLoading?: boolean
}

const Nav = React.forwardRef<HTMLElement, NavProps>(({ user, userLoading, ...props }) => {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const handleNavigation = () => {
    setOpen(false)
  }

  return (
    <nav
      className={cn(
        "flex p-3 items-center justify-between bg-background px-4 lg:px-6 max-w-7xl w-full mx-auto sticky top-0 z-50",
        props.className
      )}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <Mountains size={24} />
          <span className="font-bold">{import.meta.env.REACT_APP_NAME}</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-muted-foreground">
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            <span>Home</span>
          </Link>
          <Link
            to="/guide"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/guide" && "text-primary"
            )}
          >
            <span>Guide</span>
          </Link>
          <Link
            to="/note-example"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/note-example" && "text-primary"
            )}
          >
            <span>Notes</span>
          </Link>
          <Link
            to="/motion"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/motion" && "text-primary"
            )}
          >
            <span>Motion</span>
          </Link>
          <Link
            to="/utils"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/utils" && "text-primary"
            )}
          >
            <span>Utils</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle iconSize="md" />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {userLoading ? (
            <div className="flex items-center">
              <Skeleton className="h-10 w-10" />
            </div>
          ) : (
            <div className="flex items-center animate-in fade-in">
              {user ? (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen} modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="User menu">
                      <UserIcon size={24} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to="/profile/:id" params={{ id: user.id }}>
                      <DropdownMenuItem onClick={() => setDropdownOpen(false)} className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        setDropdownOpen(false)
                        logout()
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen} modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <UserIcon size={24} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to="/login">
                      <DropdownMenuItem onClick={() => setDropdownOpen(false)} className="cursor-pointer">
                        Log in
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/signup">
                      <DropdownMenuItem onClick={() => setDropdownOpen(false)} className="cursor-pointer">
                        Sign up
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <List size={24} />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle hidden>Navigation</SheetTitle>
              <SheetDescription hidden>
                Navigate to the pages you want.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-3 space-y-4">
              <Link
                to="/"
                className={cn(
                  "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/" && "text-primary"
                )}
                onClick={handleNavigation}
                aria-label="Home"
              >
                <Button size="icon" className="rounded-full" iconSize="lg">
                  <HouseSimple size={24} weight="fill" />
                </Button>
                <span className="text-3xl">Home</span>
              </Link>
              <Link
                to="/guide"
                className={cn(
                  "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/guide" && "text-primary"
                )}
                onClick={handleNavigation}
              >
                <Button size="icon" className="rounded-full" iconSize="lg">
                  <BookOpen size={24} weight="fill" />
                </Button>
                <span className="text-3xl">Guide</span>
              </Link>
              <Link
                to="/note-example"
                className={cn(
                  "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/note-example" && "text-primary"
                )}
                onClick={handleNavigation}
              >
                <Button size="icon" className="rounded-full" iconSize="lg">
                  <Layout size={24} weight="fill" />
                </Button>
                <span className="text-3xl">Notes</span>
              </Link>
              <Link
                to="/motion"
                className={cn(
                  "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/motion" && "text-primary"
                )}
                onClick={handleNavigation}
              >
                <Button size="icon" className="rounded-full" iconSize="lg">
                  <PersonSimpleRun size={24} weight="fill" />
                </Button>
                <span className="text-3xl">Motion</span>
              </Link>
              <Link
                to="/utils"
                className={cn(
                  "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/utils" && "text-primary"
                )}
                onClick={handleNavigation}
              >
                <Button size="icon" className="rounded-full" iconSize="lg">
                  <Toolbox size={24} weight="fill" />
                </Button>
                <span className="text-3xl">Utils</span>
              </Link>
              {/* Mobile Auth Menu Items */}
              {userLoading ? (
                <>
                  <DropdownMenuSeparator />
                  <Skeleton className="h-10 w-10" />
                </>
              ) : (
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  className="flex gap-2 col-span-2 w-full mx-auto"
                >
                  {user ? (
                    <div className="flex flex-col justify-center gap-8 col-span-2 w-full mx-auto">
                      <DropdownMenuSeparator />
                      <Link
                        to="/profile/:id"
                        params={{ id: user.id }}
                        className={cn(
                          "flex items-center space-x-4 text-md font-medium transition-colors hover:text-primary",
                          location.pathname.startsWith('/profile') && "text-primary"
                        )}
                        onClick={handleNavigation}
                      >
                        <Button size="icon" className="rounded-full" iconSize="lg">
                          <UserIcon size={24} weight="fill" />
                        </Button>
                        <span className="text-3xl">Profile</span>
                      </Link>
                      <Button
                        onClick={() => {
                          logout();
                          handleNavigation();
                        }}
                        variant="destructive"
                      >
                        <span className="text-lg">Log out</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-4 col-span-2 w-full mx-auto pt-8">
                      <DropdownMenuSeparator />
                      <Link
                        to="/login"
                        className="flex items-center space-x-4 text-md font-medium transition-all cursor-pointer"
                        onClick={handleNavigation}
                      >
                        <Button>
                          <span className="text-lg">Log in</span>
                        </Button>
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center space-x-4 text-md font-medium"
                        onClick={handleNavigation}
                      >
                        <Button>
                          <span className="text-lg">Sign up</span>
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
)

Nav.displayName = "Nav"

export { Nav }
