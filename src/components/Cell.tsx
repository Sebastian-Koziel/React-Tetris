import { StyledCell } from "./styles/StyledCell"
import { TESTROMINOS } from "../gameHelpers/tetrominos"

const Cell = ({ type }) => {
  return (
    <StyledCell type={type} color={TESTROMINOS[type].color} />
  )
}

export default Cell