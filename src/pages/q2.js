import DynamicTable from './DynamicTable';

const Q2 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Количество корпусов у факульетов</h1>
            <DynamicTable endpoint="2" />
        </div>
    );
}

export default Q2;