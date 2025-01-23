import RatingComponent from "@mui/material/Rating"
import Box from "@mui/material/Box"

const Rating = ({ name, value, readOnly, onChange }: {
  name: string,
  value: number,
  readOnly: boolean,
  onChange?: (e: any, newValue: number | null) => void
}) => {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <RatingComponent
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        precision={0.5}
      />
    </Box>
  )
}

export default Rating;
