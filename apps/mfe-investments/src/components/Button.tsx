import { BytebankButton } from "@repo/ui";

const MfeButton = ({ onClick }: { onClick?: () => void }) => (
    <BytebankButton variant={"contained"} color={'secondary'} label={"Botão do MFE Investimentos"} sendSubmit={onClick}></BytebankButton>
);

export default MfeButton;