# CPC - Coordenadas Para Cidades
Algoritmo que estima a cidade a partir de coordenadas de latitude e longitude.

## Coordenadas
A partir dos dados disponibilizados por [kelvins](https://github.com/kelvins) em seu repositório [Municipios-Brasileiros](https://github.com/kelvins/Municipios-Brasileiros).

## Como utilizar
```
const { find, findOne } = require('coords2cidades');

const near = find(-7.27, -35.89);
// [
//   {
//     city: { name: 'Campina Grande', latitude: -7.22196, longitude: -35.8731 },
//     state: { name: 'Paraíba', latitude: -7.28, longitude: -36.72, uf: 'PB' }
//   }
// ]

const near = findOne(-7.27, -35.89);
// {
//   city: { name: 'Campina Grande', latitude: -7.22196, longitude: -35.8731 },
//   state: { name: 'Paraíba', latitude: -7.28, longitude: -36.72, uf: 'PB' }
// }
```

- A função **find** retorna uma lista de pares com cidade e estado. Na maioria dos casos retornará sempre um elemento e caso existam 2 cidades ou mais à mesma distância do ponto, todas são retornadas.
- A função **findOne** retorna apenas o primeiro resultado, mesmo quando houver mais de uma cidade à mesma distância.

### Observações
O algoritmo não trata situações das coordenadas estarem fora do território brasileiro, nestes casos sempre será retornada a cidade brasileira mais próxima ao ponto.
