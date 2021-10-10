import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white.900",
        color: "#404452"
      }
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto', 
    }
  }
});
