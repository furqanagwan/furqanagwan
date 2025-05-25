// import Link from "next/link";
// import type { MDXFileData } from "../lib/blog";

// export function PostItem({
//   post,
//   isSelected,
// }: {
//   post: MDXFileData;
//   isSelected: boolean;
// }) {
//   return (
//     <div className={isSelected ? "bg-gray-800 rounded" : ""}>
//       <Link href={post.url} className="text-lg font-bold">
//         {post.metadata.title}
//       </Link>
//       <div className="text-sm text-gray-400">
//         {post.metadata.date}
//         {post.type && (
//           <span className="ml-2 px-2 py-1 rounded bg-gray-700 text-xs uppercase">
//             {post.type === "reviews"
//               ? post.subType
//                 ? `Review: ${post.subType}`
//                 : "Review"
//               : post.type.charAt(0).toUpperCase() + post.type.slice(1)}
//           </span>
//         )}
//       </div>
//       <p className="mt-1">{post.metadata.description}</p>
//     </div>
//   );
// }
import Link from "next/link"
import type { MDXFileData } from "../lib/blog"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  // Tag display logic
  let tag = ""
  if (post.type === "reviews") {
    tag = post.subType ? `REVIEW: ${post.subType.toUpperCase()}` : "REVIEW"
  } else if (post.type) {
    tag = post.type.toUpperCase()
  }

  // Date format: "May 25, 2024"
  const formattedDate = new Date(post.metadata.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <Link
          href={post.url}
          className="font-bold text-lg md:text-xl text-white"
        >
          {post.metadata.title}
        </Link>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      {tag && (
        <div className="mt-2 mb-1 w-full">
          <span className="bg-[#232935] text-xs text-gray-200 font-mono px-3 py-1 rounded select-none tracking-wider">
            {tag}
          </span>
        </div>
      )}
      <p className="text-gray-200 font-mono text-sm mt-1">{post.metadata.description}</p>
    </div>
  )
}

