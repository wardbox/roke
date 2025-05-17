import { Link } from "wasp/client/router";
import { Button } from "../client/components/ui/button";

export default function Landing() {
  return (
    <div className='flex flex-col gap-12'>
      <section id='hero'>
        <h1 className='text-4xl font-thin tracking-tight xl:text-6xl'>
          Landing Page
        </h1>
      </section>
      <section id='subscription'>
        <Button asChild>
          <Link to='/subscription'>Subscribe</Link>
        </Button>
      </section>
    </div>
  )
}
