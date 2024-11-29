type RadioButtonGroupProps = {
    items: {
        title: string;
        value: string;
    }[];
};

export default function RadioButtonGroup ({ items }: RadioButtonGroupProps) {
    return (
        <div className='flex flex-col'>
            {items.map((v, i) => (
                <div key={i}>
                    <input type='radio' value={v.value} />
                    <label>{v.title}</label>
                </div>
            ))}
        </div>
    );
}
