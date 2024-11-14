export function Footer() {
  return (
    <p>
    &copy; {new Date().getFullYear()} {import.meta.env.REACT_APP_NAME}. All rights reserved.
    </p>
  )
}

export default Footer
