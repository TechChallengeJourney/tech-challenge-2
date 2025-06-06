import { ModalProps } from "@mui/material";
import { BytebankIllustrationProps } from "../../components/illustration";

export interface BytebankModalProps extends ModalProps {
    title: string;
    illustration: BytebankIllustrationProps['name'];
    illustrationSize: BytebankIllustrationProps['variant'];
  }
  