const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001 || 8000;

app.use(cors());

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://nurionurkurtulus:nuri4141@cluster0.h8vbwry.mongodb.net/?retryWrites=true&w=majority', { 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('MongoDB bağlantısı başarıyla sağlandı.');
})
.catch((err) => {
    console.error('MongoDB bağlantısı başarısız oldu:', err);
});

// MongoDB Şema oluşturma
const basvuruSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
    idNo: Number,
    request: String,
    address: String,
    status: Boolean,
    note: String,
  });

// MongoDB Model oluşturma
const Basvuru = mongoose.model('Basvuru', basvuruSchema);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//End Point
app.post('/basvuru-olustur', async (req, res) => {
    try {
      const formData = req.body;

      // MongoDB'ye kayıt ekleme
      const yeniBasvuru = new Basvuru(formData);
      await yeniBasvuru.save();
  
      res.status(200).json({ message: 'Form verileri başarıyla MongoDB\'ye kaydedildi.' });
    } catch (error) {
      console.error('Hata:', error);
      res.status(500).json({ error: 'Bir hata oluştu.' });
    }
});

app.post('/basvuru-basarili', async(req,res) => {
    try {
      const enSonBasvuru = await Basvuru.findOne().sort({ _id: -1 }); 
      if (enSonBasvuru) {
          res.status(200).json({ enSonBasvuruId: enSonBasvuru._id });
      } else {
          res.status(404).json({ error: 'Henüz başvuru bulunmamaktadır.' });
      }
  } catch (error) {
      console.error('Hata:', error);
      res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

app.post('/basvuru-sorgula', async(req, res) => {
    const { applicationNumber } = req.body;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(applicationNumber);
    console.log(isValidObjectId)

    if (!isValidObjectId) {
        res.status(201).json({ error: 'Belirtilen idli basvuru bulunmamaktadir!' });
        return;
    }
    
    try {
        // ObjectId tipine uygunsa, findOne işlemini gerçekleştir
        const application = await Basvuru.findOne({ _id: applicationNumber });
        if (application) {
            res.status(200).json({ application });
        } else {
            res.status(404).json({ error: 'Belirtilen idli basvuru bulunmamaktadir!' });
        }
    } catch (error) {
        console.error('Sorgulama Back Hata: ', error);
        res.status(500).json({ error: 'Sorgulamada hata var' });
    }
});

app.post('/admin/basvuru-listesi', async(req,res) => {
    try {
        const allAppData = await Basvuru.find();
        res.status(200).json({ allAppData });
    } catch (error) {
        res.status(500).json({ error: 'Hata Olustu' })
    }
});

app.get('/admin/basvuru/:singleApplication', async (req,res) => {
    const appId = req.params.singleApplication;

    try {
        const application =  await Basvuru.findById(appId); 
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
});

app.put('/admin/basvuru/:id', async(req,res) => {
    const { status, note } = req.body;
    const { id } = req.params;
    try {
        const updatedApp = await Basvuru.findByIdAndUpdate(id, {status, note});
        res.status(200).json(updatedApp);
    } catch (error) {
        res.status(500).json({ error: error})
    }
});

//Server
app.listen(port, () => {
    console.log('Server working!',port);
})