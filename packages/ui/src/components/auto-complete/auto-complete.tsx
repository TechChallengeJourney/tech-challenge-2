import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

// Interface para a estrutura de dados das opções
interface Option {
  id: number;
  nome: string;
}

const AsyncSelectAutocomplete: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  // Simulação de uma chamada de API
  const fetchOptions = async () => {
    setLoading(true);
    try {
      // Simula um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500)); 

      // Dados simulados que viriam da sua API
      const data: Option[] = [
        { id: 101, nome: 'Opção Carregada 1' },
        { id: 102, nome: 'Opção Carregada 2' },
        { id: 103, nome: 'Opção Carregada 3' },
        { id: 104, nome: 'Outra Categoria' },
        { id: 105, nome: 'Item Final' },
      ];
      setOptions(data);
    } catch (error) {
      console.error('Erro ao carregar opções:', error);
      // Aqui você poderia lidar com o erro, talvez mostrar uma mensagem para o usuário
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && options.length === 0) { // Carrega apenas se estiver aberto e as opções não foram carregadas
      fetchOptions();
    }
  }, [open, options.length]); // Dependências: reage à mudança de 'open' ou 'options.length'

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      
      options={options}
      getOptionLabel={(option) => option.nome}
      
      // Controla o valor selecionado
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue as Option | null);
      }}

      // Input Value é essencial para um comportamento de select sem digitação
      // Ele é vazio quando nada está selecionado, ou o nome da opção selecionada
      onInputChange={(event, newInputValue) => {
        // Não faz nada com newInputValue, pois não queremos que o usuário digite
        // Se precisar que o texto do campo reflita a seleção ao invés de ficar vazio,
        // o `value` já cuida disso automaticamente.
      }}
      
      // --- Propriedades Chave para o Comportamento de SELECT ---
      freeSolo={false} // Desabilita a digitação livre
      filterOptions={(options) => options} // Mostra todas as opções carregadas, sem filtro de digitação
      
      loading={loading}
      loadingText="Carregando..." // Texto exibido enquanto carrega
      
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecione uma Opção"
          variant="outlined"
          // --- Propriedade para tornar o campo SOMENTE LEITURA ---
          InputProps={{
            ...params.InputProps,
            readOnly: true, // Impede a digitação direta no campo
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncSelectAutocomplete;