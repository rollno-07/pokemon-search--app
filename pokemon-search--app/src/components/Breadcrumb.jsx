import Link from "next/link";

export default function Breadcrumb({ name }) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/" className="text-blue-600 hover:underline font-primary">
        Home
      </Link>{" "}
      → <span className="capitalize font-primary">{name}</span>
    </nav>
  );
}
