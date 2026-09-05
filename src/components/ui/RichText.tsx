import { Fragment, type ReactNode } from 'react'
import { cx } from '../../lib/utils'

/** Met en forme **gras** et *italique* dans une ligne de texte. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let index = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b${index}`} className="font-semibold text-ink">
          {match[1]}
        </strong>,
      )
    } else if (match[2] !== undefined) {
      nodes.push(
        <em key={`${keyPrefix}-i${index}`} className="italic">
          {match[2]}
        </em>,
      )
    }
    lastIndex = match.index + match[0].length
    index += 1
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

/**
 * Rendu simple : sauts de ligne conservés, listes à puces avec « - »,
 * gras avec **…** et italique avec *…*.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n')
  const blocks: ReactNode[] = []
  let bullets: string[] = []

  const flush = (key: string) => {
    if (bullets.length === 0) return
    blocks.push(
      <ul key={key} className="my-1 ml-4 list-disc space-y-1 marker:text-primary">
        {bullets.map((item, i) => (
          <li key={i}>{inline(item, `${key}-${i}`)}</li>
        ))}
      </ul>,
    )
    bullets = []
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ')) {
      bullets.push(trimmed.slice(2))
      return
    }
    flush(`ul-${i}`)
    if (trimmed === '') {
      blocks.push(<div key={`sp-${i}`} className="h-2" />)
      return
    }
    blocks.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {inline(trimmed, `p-${i}`)}
      </p>,
    )
  })
  flush('ul-end')

  return <div className={cx('space-y-1 text-sm text-ink-soft', className)}>{blocks.map((b, i) => (
    <Fragment key={i}>{b}</Fragment>
  ))}</div>
}
