import { Button } from "@chakra-ui/react";

type TimerButtonProps = {
  onClick: () => void;
  children: string;
};
const TimerButton: React.FC<TimerButtonProps> = ({ onClick, children }) => {
  return (
    <Button colorScheme="blue" w={40} onClick={onClick}>
      {children}
    </Button>
  );
};

export default TimerButton;
