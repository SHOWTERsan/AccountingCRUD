import DynamicTable from './DynamicTable';

const Q6 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Общая плошадь помещений в копусах</h1>
            <DynamicTable endpoint="6" />
        </div>
    );
}

export default Q6;