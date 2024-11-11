import {Button, ButtonProps} from "@/components/ui/button.tsx";


interface ActionButtonProps extends React.PropsWithChildren {
    handleClick: (...args: unknown[]) => unknown;
}

function ActionButton({handleClick, children, ...rest}: ActionButtonProps & ButtonProps) {
    return (
        <Button
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Button>
    );
}

export default ActionButton;