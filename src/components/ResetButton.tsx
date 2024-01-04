import { Button } from "@chakra-ui/react";

type ResetButtonProps = {
  onReset: () => void;
  children: string;
};
const ResetButton: React.FC<ResetButtonProps> = ({ onReset, children }) => {
  return (
    <Button colorScheme="blue" w={40} onClick={onReset}>
      {children}
    </Button>
  );
};

export default ResetButton;
