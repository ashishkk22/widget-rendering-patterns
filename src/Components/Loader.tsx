import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={400}
    >
      <Box textAlign="center">
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;
