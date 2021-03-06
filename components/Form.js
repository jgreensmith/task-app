
import { useState } from "react";
import { useRouter } from 'next/router'

import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";


export default function Form() {
    const router = useRouter()
    const contentType = 'application/json'
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        title: '',
        message: '',
        pals: 0
    })

// add a project to the data base
    const postData = async (form) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form)
            })
            if (!res.ok) {
                throw new Error(res.status)
            }
            router.push('/')
        } catch (error) {
            setMessage('Failed to post Project')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postData(form)
    }


    return(
        <Paper sx={{mb: 3}}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Find some Pals for your Project</Typography>
                <TextField 
                    name="title"
                    value={form.title}
                    variant="outlined"
                    label="Title"
                    fullWidth
                    sx={{p:2}}
                    onChange={handleChange}
                />
                <TextField
                    name="message"
                    value={form.message}
                    variant="outlined"
                    label="Message"
                    fullWidth
                    sx={{p:2}}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{p:2}}>
                    <InputLabel id="demo-simple-select-label">Pals</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="pals"
                        value={form.pals}
                        label="Pals"
                        onChange={handleChange}
                    >
                    {[...Array(100).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <p>{message}</p>
                <Button  variant="contained" color="primary" size="large" type="submit" fullWidth sx={{p:2}}>Submit</Button>
                <Button variant="text" color="secondary" size="small"  fullWidth sx={{p:2}}>Clear</Button>
            </form>
        </Paper>
    )
}