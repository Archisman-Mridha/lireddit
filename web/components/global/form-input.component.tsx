import { FormControl, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useField } from "formik"
import { FC, HTMLInputTypeAttribute } from "react"
import { getInputIcon } from "../../functions/get-input-icon"
import { InputFieldError, StyledInput, StyledTextArea } from "../../styles/global.styles"

interface formTextFieldProps {

    placeholder: string
    inputType: HTMLInputTypeAttribute
    name: string
    setFieldValue: Function
    isTextArea?: boolean
}

export const FormTextField: FC<formTextFieldProps> = ({ placeholder, inputType, name, setFieldValue, isTextArea }) => {
    const [_, { error, touched }]= useField({ name })

    return (

        <>
            <FormControl isInvalid= {error && touched}>
                {
                    !isTextArea ? (

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents= "none"
                                children= { getInputIcon(placeholder) }
                                height= "47.5px"
                            />

                            <StyledInput
                                placeholder= { placeholder }
                                type= {inputType}
                                name= {name}
                                onChange= {event => setFieldValue(name, event.target.value)}
                            />
                        </InputGroup>

                    ): (

                        <StyledTextArea
                            placeholder= { placeholder }
                            name= {name}
                            onChange= {event => setFieldValue(name, event.target.value)}
                        />

                    )
                }

                <InputFieldError>{ error }</InputFieldError>
            </FormControl>
        </>

    )
}