import { StyledCell } from "./styles/StyledCell"
import { TESTROMINOS } from "../gameHelpers/tetrominos"

const Cell = ({ type }) => {
  return (
    <StyledCell type={'L'} color={TESTROMINOS['L'].color} />
  )
}

export default Cell