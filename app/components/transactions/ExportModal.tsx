import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaFileExport } from "react-icons/fa";
import { PdfDoc } from "../PdfDoc";
import { useFilterStore } from "@/store/filter-store";
import { useTransactionsStore } from "@/store/TransactionsStore";

export default function ExportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentPeriod } = useFilterStore();

  const { transactions } = useTransactionsStore();

  return (
    <>
      <Icon onClick={onOpen} as={FaFileExport} color="#f59e0b" w={6} h={6} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Export As</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PDFDownloadLink
              document={
                <PdfDoc
                  transactions={transactions!}
                  currentPeriod={currentPeriod}
                />
              }
              fileName={"transaction-overview"}
            >
              <button>PDF</button>
            </PDFDownloadLink>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
