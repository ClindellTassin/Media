import { ErrorMessage, Form, Formik } from "formik"
import MyTextInput from "../../app/common/form/MyTextInput"
import { Button, Header, Label } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { observer } from "mobx-react-lite"
import * as yup from 'yup';
import ValidationError from "../../app/errors/ValidationError"

const RegisterForm = () => {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', displayName: '', username: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error => setErrors({ error }))}
            validationSchema={yup.object({
                email: yup.string().required(),
                password: yup.string().required(),
                displayName: yup.string().required(),
                username: yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" autoComplete='off' onSubmit={handleSubmit}>
                    <Header as='h2' content='Register to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="Username" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name="error" render={() => <ValidationError errors={errors.error as unknown as string[]} />} />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive fluid content='Register' type='submit' />
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm);