import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useSelector } from "react-redux";
import CsvDownloader from "react-csv-downloader";
import { EXPORT_FILE_EXTENSION } from "../../utils/crud";

const ExportCsvDataSettingsView = (props) => {
  const books = useSelector((state) => state.books.books);
  const csvFileName = `library${Date.now().toString()}`;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronRightIcon />}>
        <div>
          <Typography variant={"h1"}>Export Libraries</Typography>
          <Typography variant={"subtitle1"}>
            Export all your book from the library to a comma-separated-values
            (csv) file.
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Box marginTop={1}>
          <CsvDownloader
            filename={csvFileName}
            extension={EXPORT_FILE_EXTENSION}
            wrapColumnChar="'"
            datas={books}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<GetAppIcon />}
            >
              Download CSV
            </Button>
          </CsvDownloader>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExportCsvDataSettingsView;
