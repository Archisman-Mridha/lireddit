import { FormControl, Icon, Input } from "native-base"
import { FC } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { getInputIcon } from "../functions/get-input-icon"
import { useField } from "formik"

interface formInputProps {

    placeholder: string
    name: string
    setFieldValue: Function
}

export const FormInput: FC<formInputProps>= ({ placeholder, name, setFieldValue }) => {
    const [_, { touched, error, value }]= useField(name)

    return (

        <>
            <FormControl isInvalid= { !!(error && touched) }>
                <Input
                    value= { value }
                    placeholder= { placeholder }
                    InputLeftElement= { getInputIcon(placeholder) }
                    onChangeText= { (changedValue: string) => setFieldValue(name, changedValue) }
                />

                <FormControl.ErrorMessage leftIcon={ <Icon as= { MaterialIcons } name= "error-outline" size= "18px" /> }>
                    { error }
                </FormControl.ErrorMessage>
            </FormControl>
        </>

    )
}