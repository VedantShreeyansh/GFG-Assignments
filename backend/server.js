import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otps = {};

function generateOTP(){
    return '123456';
}

app.post('/api/register', (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    otps[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    console.log(`Mock OTP for ${email}: ${otp}`);
    res.json({ message: 'Mock OTP sent (always 123456 for demo).'});
});

app.post('/api/verify-otp', (req, res) => {
    const { email, otp} = req.body;
    const record = otps[email];
    if (!record) return res.status(400).json({ message: 'No OTP found' });
    if (Date.now() > record.expires) return res.status(400).json({ message: 'OTP expired' });
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP (use 123456 for demo'});

    delete otps[email];
    res.json({ message: 'OTP verified (mock) '});
})

app.get('/', (req, res) => {
    res.send('Backend is running!'); 
});

app.listen(5000, () => console.log('Backend running on port 5000'));