import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GetAppIcon from "@material-ui/icons/GetApp";
import { RootStateOrAny, useSelector } from "react-redux";
import CsvDownloader from "react-csv-downloader";
import { EXPORT_FILE_EXTENSION } from "../../utils/crud";
import { LibButton } from "../../components/common/LibButton";

const ExportCsvDataSettingsView: React.FC = () => {
  const books = useSelector((state: RootStateOrAny) => state.books.books);
  const csvFileName = `library${Date.now().toString()}`;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronRightIcon />}>
        <div>
          <Typography variant={"h1"}>Export Library</Typography>
          <Typography variant={"subtitle1"}>
            Export all your books from the library to a comma-separated-values
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
            <LibButton
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<GetAppIcon />}
            >
              Download CSV
            </LibButton>
          </CsvDownloader>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExportCsvDataSettingsView;
