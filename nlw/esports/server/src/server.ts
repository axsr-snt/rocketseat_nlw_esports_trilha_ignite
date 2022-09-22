import express from 'express';

import cors from 'cors';
//biblioteca utilizada para proteger a aplicação. Indicamos quais endereços front-end pode acessar o back-end

import { PrismaClient } from '@prisma/client';

import { convertHourStringToMinutes, convertMinutesToHoursString } from './utils/convert-hour';

const app = express()

const prisma = new PrismaClient({
    log: ['query']
});

app.use(express.json()); 
// esse parametro diz ao express que será utilizado o formato json no request.

app.use(cors());
//parametrização do cors, onde indicamos quais front-ends acessárão ao back-end. se o parametro do cors estiver vazio todos os front-end poderão acessar o back-end.


//Lista os games cadastrados na plataforma
app.get('/games', async (request, response) => {
const games = await prisma.game.findMany({
    include:{
        _count: {
            select: {
                ads: true,
            }
        }
    }
});

    return response.json(games);

});
//Cadastra um anúncio
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;
    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDay: body.weekDay.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoice: body.useVoice,
        }
    });
    
    return response.status(201).json(ad);

});
//Lista anúncios filtrados por game
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDay: true,
            useVoice: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createDate: 'desc'
        }
    });

    return response.json(ads.map(ad => {
        return {
        ...ad,
            weekDay: ad.weekDay.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }));
});
//Mostra o discord do possível duo anunciante
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });

    return response.json({
        discord: ad.discord,
    });
});

//configuração de qual porta no host "escutará" a aplicação
app.listen(3333);