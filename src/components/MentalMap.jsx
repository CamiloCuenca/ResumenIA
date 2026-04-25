import { Lightbulb } from 'lucide-react'

const VIEWBOX_WIDTH = 1560
const MIN_VIEWBOX_HEIGHT = 560
const CENTER_X = VIEWBOX_WIDTH / 2
const CENTER_WIDTH = 250
const CENTER_HEIGHT = 78
const BRANCH_WIDTH = 220
const BRANCH_HEIGHT = 56
const SUB_WIDTH = 210
const SUB_HEIGHT = 34
const BRANCH_GAP_FROM_CENTER = 170
const SUB_GAP_FROM_BRANCH = 90
const SUB_ROW_GAP = 44
const BRANCH_BLOCK_GAP = 36

function wrapText(value, maxChars = 24) {
  if (!value) return []
  const words = String(value).split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
  })

  if (current) lines.push(current)
  return lines.slice(0, 3)
}

function buildSideLayout(branches) {
  let cursor = 0
  const items = branches.map((rama) => {
    const subtopics = Array.isArray(rama.subtemas) ? rama.subtemas.filter(Boolean) : []
    const subBlockHeight = subtopics.length > 0 ? (subtopics.length - 1) * SUB_ROW_GAP + SUB_HEIGHT : 0
    const blockHeight = Math.max(BRANCH_HEIGHT, subBlockHeight)
    const centerY = cursor + blockHeight / 2
    const branchY = centerY - BRANCH_HEIGHT / 2
    const subStartY = centerY - subBlockHeight / 2

    const subnodes = subtopics.map((text, index) => ({
      text,
      y: subStartY + index * SUB_ROW_GAP,
    }))

    cursor += blockHeight + BRANCH_BLOCK_GAP

    return {
      tema: rama.tema,
      centerY,
      branchY,
      subnodes,
    }
  })

  return {
    items,
    totalHeight: Math.max(0, cursor - BRANCH_BLOCK_GAP),
  }
}

export function MentalMap({ mapaMental }) {
  if (!mapaMental || typeof mapaMental !== 'object') {
    return null
  }

  const { nodo_central, ramas } = mapaMental

  if (!nodo_central || !Array.isArray(ramas)) {
    return null
  }

  const ramasLimpias = ramas.filter((rama) => rama && typeof rama === 'object' && rama.tema)
  if (ramasLimpias.length === 0) {
    return null
  }

  const leftBranches = []
  const rightBranches = []
  ramasLimpias.forEach((rama, index) => {
    if (index % 2 === 0) {
      rightBranches.push(rama)
    } else {
      leftBranches.push(rama)
    }
  })

  const leftLayout = buildSideLayout(leftBranches)
  const rightLayout = buildSideLayout(rightBranches)
  const contentHeight = Math.max(leftLayout.totalHeight, rightLayout.totalHeight, MIN_VIEWBOX_HEIGHT - 120)
  const viewboxHeight = contentHeight + 120
  const leftOffset = (contentHeight - leftLayout.totalHeight) / 2 + 60
  const rightOffset = (contentHeight - rightLayout.totalHeight) / 2 + 60
  const centerY = viewboxHeight / 2

  const rightBranchX = CENTER_X + BRANCH_GAP_FROM_CENTER
  const leftBranchX = CENTER_X - BRANCH_GAP_FROM_CENTER - BRANCH_WIDTH
  const rightSubX = rightBranchX + BRANCH_WIDTH + SUB_GAP_FROM_BRANCH
  const leftSubX = leftBranchX - SUB_GAP_FROM_BRANCH - SUB_WIDTH

  const centralLines = wrapText(nodo_central, 30)

  return (
    <section className="mental-map-card insight-card">
      <div className="section-title">
        <Lightbulb size={19} />
        <h2>Mapa mental</h2>
      </div>

      <div className="mindmap-canvas" aria-label="Mapa mental">
        <svg
          width="100%"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${viewboxHeight}`}
          preserveAspectRatio="xMidYMin meet"
          role="img"
          aria-label="Mapa mental de temas y subtemas"
        >
          <defs>
            <linearGradient id="centralNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>

          <rect
            x={CENTER_X - CENTER_WIDTH / 2}
            y={centerY - CENTER_HEIGHT / 2}
            width={CENTER_WIDTH}
            height={CENTER_HEIGHT}
            rx="14"
            className="mindmap-node central"
          />
          <rect
            x={CENTER_X - CENTER_WIDTH / 2}
            y={centerY - CENTER_HEIGHT / 2}
            width={CENTER_WIDTH}
            height={CENTER_HEIGHT}
            rx="14"
            fill="url(#centralNodeGradient)"
            opacity="0.92"
          />

          {centralLines.map((line, index) => (
            <text
              key={`central-line-${index}`}
              x={CENTER_X}
              y={centerY - (centralLines.length - 1) * 10 + index * 20}
              className="mindmap-text central"
            >
              {line}
            </text>
          ))}

          {leftLayout.items.map((item, index) => {
            const branchCenterY = item.centerY + leftOffset
            const branchY = item.branchY + leftOffset

            return (
              <g key={`left-branch-${item.tema}-${index}`}>
                <path
                  d={`M ${CENTER_X - CENTER_WIDTH / 2} ${centerY} C ${CENTER_X - 220} ${centerY}, ${leftBranchX + BRANCH_WIDTH + 60} ${branchCenterY}, ${leftBranchX + BRANCH_WIDTH} ${branchCenterY}`}
                  className="mindmap-link"
                />
                <rect x={leftBranchX} y={branchY} width={BRANCH_WIDTH} height={BRANCH_HEIGHT} rx="12" className="mindmap-node branch" />
                {wrapText(item.tema).map((line, lineIndex, arr) => (
                  <text
                    key={`left-branch-text-${index}-${lineIndex}`}
                    x={leftBranchX + BRANCH_WIDTH / 2}
                    y={branchCenterY - (arr.length - 1) * 8 + lineIndex * 16}
                    className="mindmap-text"
                  >
                    {line}
                  </text>
                ))}

                {item.subnodes.map((subnode, subIndex) => (
                  <g key={`left-sub-${index}-${subIndex}`}>
                    <line
                      x1={leftBranchX}
                      y1={branchCenterY}
                      x2={leftSubX + SUB_WIDTH}
                      y2={subnode.y + leftOffset + SUB_HEIGHT / 2}
                      className="mindmap-sub-link"
                    />
                    <rect
                      x={leftSubX}
                      y={subnode.y + leftOffset}
                      width={SUB_WIDTH}
                      height={SUB_HEIGHT}
                      rx="10"
                      className="mindmap-node sub"
                    />
                    <text x={leftSubX + SUB_WIDTH / 2} y={subnode.y + leftOffset + SUB_HEIGHT / 2 + 4} className="mindmap-text sub">
                      {String(subnode.text).length > 34 ? `${String(subnode.text).slice(0, 31)}...` : subnode.text}
                    </text>
                  </g>
                ))}
              </g>
            )
          })}

          {rightLayout.items.map((item, index) => {
            const branchCenterY = item.centerY + rightOffset
            const branchY = item.branchY + rightOffset

            return (
              <g key={`right-branch-${item.tema}-${index}`}>
                <path
                  d={`M ${CENTER_X + CENTER_WIDTH / 2} ${centerY} C ${CENTER_X + 220} ${centerY}, ${rightBranchX - 60} ${branchCenterY}, ${rightBranchX} ${branchCenterY}`}
                  className="mindmap-link"
                />
                <rect x={rightBranchX} y={branchY} width={BRANCH_WIDTH} height={BRANCH_HEIGHT} rx="12" className="mindmap-node branch" />
                {wrapText(item.tema).map((line, lineIndex, arr) => (
                  <text
                    key={`right-branch-text-${index}-${lineIndex}`}
                    x={rightBranchX + BRANCH_WIDTH / 2}
                    y={branchCenterY - (arr.length - 1) * 8 + lineIndex * 16}
                    className="mindmap-text"
                  >
                    {line}
                  </text>
                ))}

                {item.subnodes.map((subnode, subIndex) => (
                  <g key={`right-sub-${index}-${subIndex}`}>
                    <line
                      x1={rightBranchX + BRANCH_WIDTH}
                      y1={branchCenterY}
                      x2={rightSubX}
                      y2={subnode.y + rightOffset + SUB_HEIGHT / 2}
                      className="mindmap-sub-link"
                    />
                    <rect
                      x={rightSubX}
                      y={subnode.y + rightOffset}
                      width={SUB_WIDTH}
                      height={SUB_HEIGHT}
                      rx="10"
                      className="mindmap-node sub"
                    />
                    <text x={rightSubX + SUB_WIDTH / 2} y={subnode.y + rightOffset + SUB_HEIGHT / 2 + 4} className="mindmap-text sub">
                      {String(subnode.text).length > 34 ? `${String(subnode.text).slice(0, 31)}...` : subnode.text}
                    </text>
                  </g>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
