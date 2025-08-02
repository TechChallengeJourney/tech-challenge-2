import './style.scss';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@repo/utils';
import { BytebankModalProps } from '../../classes';
import { BytebankText } from '../text/text';

export function BytebankModal({
  onClose,
  open,
  children,
  title,
}: BytebankModalProps) {
  const { isDarkMode, colors } = useTheme();
  const bgColor = isDarkMode ? colors['lime.50'] : colors['white.main'];
  return (
    <Modal open={open} onClose={onClose} aria-labelledby={title}>
      <Box
        className={`bytebank-modal`}
        sx={{ backgroundColor: bgColor, borderColor: colors['lime.200'], borderWidth: 1, borderStyle: 'solid' }}
      >
        <Box
          className="bytebank-modal-close"
        >
        <IconButton onClick={(event) => onClose?.(event, 'backdropClick')}>
          <CloseIcon />
        </IconButton>
        </Box>


        <Box pb={2}>
          <BytebankText alignContent="center" fontWeight="700" color="textPrimary" variant={'md'} >
            {title}
          </BytebankText>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
