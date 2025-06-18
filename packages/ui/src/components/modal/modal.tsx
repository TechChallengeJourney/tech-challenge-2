// import {
//   BytebankIllustration,
//   BytebankIllustrationProps,
// } from '../illustration';
import './style.scss';
import { Box, Modal, ModalProps, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../../contexts/theme.context';

export interface BytebankModalProps extends ModalProps {
  title: string;
  // illustration: BytebankIllustrationProps['name'];
  // illustrationSize: BytebankIllustrationProps['variant'];
  illustrationShow?: boolean;
  fullHeight?: boolean;
}

export function BytebankModal({
  onClose,
  open,
  children,
  title,
  // illustration,
  // illustrationSize,
  illustrationShow,
  fullHeight = false,
}: BytebankModalProps) {
  const { isDarkMode, colors } = useTheme();
  const bgColor = isDarkMode ? colors['lime.50'] : colors['white.main'];
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={`bytebank-modal ${fullHeight && 'bytebank-modal-full-height'
          }`}
        sx={{ backgroundColor: bgColor, borderColor: colors['lime.200'], borderWidth: 1, borderStyle: 'solid' }}
      >
        <Box
          onClick={(event) => onClose?.(event, 'backdropClick')}
          className="bytebank-modal-close"
        >
          <CloseIcon />
        </Box>
        {/* <Box display="flex" justifyContent="center">
          {illustrationShow && (
            <BytebankIllustration
              variant={illustrationSize}
              name={illustration}
            />
          )}
        </Box> */}

        <Box pb={2}>
          <Typography alignContent="center" fontWeight="700" color="textPrimary" variant={'md'} >
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
