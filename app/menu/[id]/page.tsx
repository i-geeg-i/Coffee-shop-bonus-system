type Props = {
    params: {
        id: string;
    };
};

export default function Item({params: {id}}: Props) {
    return <h1 className="item">Item {id}</h1>;
}