import {
  BytebankIllustration,
  BytebankIllustrationProps,
} from '../illustration';
import './style.scss';
import { Box, Modal, ModalProps, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface BytebankModalProps extends ModalProps {
  title: string;
  illustration: BytebankIllustrationProps['name'];
  illustrationSize: BytebankIllustrationProps['variant'];
  illustrationShow?: boolean;
  fullHeight?: boolean;
}

export function BytebankModal({
  onClose,
  open,
  children,
  title,
  illustration,
  illustrationSize,
  illustrationShow,
  fullHeight = false,
}: BytebankModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={`bytebank-modal ${
          fullHeight && 'bytebank-modal-full-height'
        }`}
      >
        <button
          onClick={(event) => onClose?.(event, 'backdropClick')}
          className="bytebank-modal-close"
        >
          <CloseIcon />
        </button>
        <Box display="flex" justifyContent="center">
          {illustrationShow && (
            <BytebankIllustration
              variant={illustrationSize}
              name={illustration}
            />
          )}
        </Box>
        <Typography alignContent="center" fontWeight="bold" color="textPrimary">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}
