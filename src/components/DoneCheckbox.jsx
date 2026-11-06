export default function DoneCheckbox({ checked, label, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-pink-500"
    />
  )
}
