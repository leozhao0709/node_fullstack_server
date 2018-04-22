import * as React from 'react';
import * as styles from './AddButton.css';

interface AddButtonProps {
    className?: string;
    onClick: () => void;
}

const AddButton: React.SFC<AddButtonProps> = (props: AddButtonProps) => {
    let className = styles.addButton;

    if (props.className) {
        className = [className, props.className].join(' ');
    }

    return (
        <button
            className={className}
            onClick={props.onClick}
        />
    );
};

AddButton.defaultProps = {
};

export default AddButton;