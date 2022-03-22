import { FormControl, Icon, Input } from "native-base"
import { FC, useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { getInputIcon } from "../functions/get-input-icon"
import { useField } from "formik"

interface formInputProps {

    placeholder: string
    name: string
    setFieldValue: Function
    type?: string
}

export const FormInput: FC<formInputProps>= ({ placeholder, name, setFieldValue, type= "text" }) => {
    const [_, { touched, error, value }]= useField(name)

    const [showText, setShowText]= useState<boolean>(type === "text")

    const toggleShowText= ( ) => setShowText(prevState => !prevState)

    return (

        <>
            <FormControl isInvalid= { !!(error && touched) }>
                <Input
                    value= { value }
                    placeholder= { placeholder }
                    InputLeftElement= { getInputIcon(placeholder) }
                    onChangeText= { (changedValue: string) => setFieldValue(name, changedValue) }
                    type= { showText ? "text": "password" }

                    InputRightElement= {

                        type === "password" ? (

                            <Icon
                                as= { MaterialIcons }
                                name= { !showText ? "visibility": "visibility-off" }
                                marginX= "10px"
                                onPress= { toggleShowText }
                            />

                        ): undefined
                    }
                />

                <FormControl.ErrorMessage leftIcon={ <Icon as= { MaterialIcons } name= "error-outline" size= "18px" /> }>
                    { error }
                </FormControl.ErrorMessage>
            </FormControl>
        </>

    )
}