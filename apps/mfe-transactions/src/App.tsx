import './App.scss';
import { BytebankThemeProvider } from '@repo/utils';
import { FlashOn, FilterVintage } from '@mui/icons-material';
import { Box } from '@mui/material';
import { BytebankCard, BytebankButton } from '@repo/ui';
import SecurityIcon from '@mui/icons-material/Security';

function App() {
  return (
    <BytebankThemeProvider>
      <Box className="App">
        <Box display={"flex"} flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" >
          <Box textAlign={"center"}>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Este é a aplicação Microfrontend de Transações do Bytebank
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Uma solução moderna e elegante para gerenciamento de componentes de transação
            </p>

            {/* Feature Cards */}
            <Box display={"flex"} justifyContent={"center"} justifyItems={"center"} gap={2} mt={5}>
              <BytebankCard className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} p={4}>
                  <Box width={'5em'}>
                    <BytebankCard bgcolor='#ebffcb'>
                      <Box display={'flex'} justifyContent={'center'} p={2}>
                        <SecurityIcon />
                      </Box>
                    </BytebankCard>
                  </Box>
                  <h3>Seguro</h3>
                  <p>Transações protegidas com os mais altos padrões de segurança</p>
                </Box>
              </BytebankCard>

              <BytebankCard>
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} p={4}>
                  <Box width={'5em'}>
                    <BytebankCard bgcolor='#ebffcb'>
                      <Box display={'flex'} justifyContent={'center'} p={2}>
                        <FlashOn />
                      </Box>
                    </BytebankCard>
                  </Box>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido</h3>
                  <p className="text-gray-600">Processamento instantâneo de todas as operações</p>
                </Box>
              </BytebankCard>
              <BytebankCard>
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} p={4}>
                  <Box width={'5em'}>
                    <BytebankCard bgcolor='#ebffcb'>
                      <Box display={'flex'} justifyContent={'center'} p={2}>
                        <FilterVintage />
                      </Box>
                    </BytebankCard>
                  </Box>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexível</h3>
                  <p className="text-gray-600">Componentes modulares e facilmente integráveis</p>
                </Box>
              </BytebankCard>
            </Box>

            <Box mt={5}>
              <BytebankButton onClick={() => alert('Button clicked!')} label={'Começar Agora'} color={'primary'} variant={'contained'} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>}>
        <BytebankExtract />
      </Suspense> */}
    </BytebankThemeProvider>
  );
}

export default App;
