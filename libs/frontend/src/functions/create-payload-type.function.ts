export const createPayloadType=
    <T>( ) => {

        return (payload: T) => ({ payload })
    }