import { StyledCell } from "./styles/StyledCell"
import { TESTROMINOS } from "../gameHelpers/tetrominos"

interface CellProps {
  type: keyof typeof TESTROMINOS
}

const Cell:React.FC<CellProps> = ({ type }) => {
  return (
    <StyledCell type={type} color={TESTROMINOS[type].color} />
  )
}

export default Cell