import { StyledCell } from "./styles/StyledCell"
import { TESTROMINOS } from "../gameHelpers/tetrominos"
import { memo } from "react"

interface CellProps {
  type: keyof typeof TESTROMINOS
}

const Cell:React.FC<CellProps> = ({ type }) => {
  return (
    <StyledCell type={type} color={TESTROMINOS[type].color} />
  )
}

export default memo(Cell);