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
  Flex,
} from "@chakra-ui/react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaFileExport } from "react-icons/fa";
import { PdfDoc } from "../PdfDoc";
import { useFilterStore } from "@/store/filter-store";
import { useTransactionsStore } from "@/store/transactions-store";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import { getCategoryById } from "@/hooks/useGetCategoryById";
import CsvDoc from "../CsvDoc";

export default function ExportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentPeriod } = useFilterStore();
  const [categories, setCategories] = useState<Category[]>([]);

  const { transactions } = useTransactionsStore();

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.transactionType === "expense"
  );

  useEffect(() => {
    async function getCategories() {
      const categoires = await Promise.all(
        filteredTransactions?.map(({ categoryId }) => {
          return getCategoryById(categoryId);
        })
      );

      setCategories(categoires);
    }

    if (transactions) {
      getCategories();
    }
  }, [transactions]);

  return (
    <>
      <Icon onClick={onOpen} as={FaFileExport} color="#f59e0b" w={6} h={6} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Export As</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={6}>
              {/* <PDFDownloadLink
                document={
                  <PdfDoc
                    transactions={filteredTransactions!}
                    currentPeriod={currentPeriod}
                    categories={categories}
                  />
                }
                fileName={"transaction-overview"}
              >
                <button>PDF</button>
              </PDFDownloadLink> */}
              <CsvDoc
                transactions={filteredTransactions!}
                currentPeriod={currentPeriod}
                categories={categories}
              />
            </Flex>
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
