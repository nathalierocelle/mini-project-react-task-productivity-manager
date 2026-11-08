import { useState } from 'react'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Circular avatar that falls back to the person's initials if the image is missing or fails.
// `className` sets size, initials text size and any ring. Give it `key={src}` so the
// fallback resets when the image changes.
export default function Avatar({ src, name, className = 'size-8 text-xs' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-full bg-pink-500/15 font-semibold text-pink-300 ${className}`}
      >
        {getInitials(name)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full bg-slate-800 object-cover ${className}`}
    />
  )
}
