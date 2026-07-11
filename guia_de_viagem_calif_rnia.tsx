import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  ShoppingBag, 
  TreePine, 
  Phone, 
  Info, 
  CalendarDays, 
  Map, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  BedDouble,
  Compass,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// --- DADOS DA APLICAÇÃO ---

const FLIGHTS_DATA = {
  ida: {
    data: "08/08/2026",
    horario: "21:45h",
    origem: "GRU (São Paulo)",
    destino: "LAX (Los Angeles)",
    voo: "AA 9876",
    terminal: "3"
  },
  volta: {
    data: "20/08/2026",
    horario: "09:32h",
    origem: "SAN (San Diego)",
    destino: "GRU (São Paulo)",
    voo: "AA 1234",
    terminal: "2"
  },
  passageiros: [
    { nome: "Dária", localizador: "ABC123Z", assento: "14A" },
    { nome: "Passageiro 2", localizador: "ABC123Z", assento: "14B" },
    { nome: "Passageiro 3", localizador: "ABC123Z", assento: "14C" }
  ]
};

const HOTELS_DATA = [
  {
    nome: "Hotel Indigo Los Angeles Downtown",
    checkin: "08/08/2026",
    checkout: "14/08/2026",
    endereco: "899 Francisco St, Los Angeles, CA 90017",
    mapLink: "https://maps.google.com/?q=Hotel+Indigo+Los+Angeles+Downtown",
    imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&h=400",
    descricao: "Hotel moderno no coração de Downtown LA, próximo a diversas atrações."
  },
  {
    nome: "Hotel em San Diego (A Definir)",
    checkin: "14/08/2026",
    checkout: "20/08/2026",
    endereco: "San Diego, CA",
    mapLink: "https://maps.google.com/?q=San+Diego,+CA",
    imagem: "https://images.unsplash.com/photo-1695669341490-6da48de6c8a7?auto=format&fit=crop&q=80&w=800&h=400",
    descricao: "Hospedagem para a segunda parte da viagem, aproveitando o clima de praia."
  }
];

const ITINERARY_DATA = [
  {
    dia: "08/08",
    semana: "Sábado",
    titulo: "Chegada em Los Angeles",
    periodos: [
      {
        nome: "Noite",
        atividades: [
          "Chegada no aeroporto LAX às 21:45h",
          "Retirada de bagagens e imigração",
          "Check-in no Hotel Indigo Los Angeles Downtown"
        ],
        mapLink: "https://maps.google.com/?q=Hotel+Indigo+Los+Angeles+Downtown"
      }
    ]
  },
  {
    dia: "09/08",
    semana: "Domingo",
    titulo: "Santa Mônica e Venice Beach",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Passeio pelo Santa Monica Píer (Ponto final da Rota 66)",
          "Visita ao Pacific Park e Roda Gigante",
          "Aquário de Santa Monica"
        ],
        mapLink: "https://maps.google.com/?q=Santa+Monica+Pier"
      },
      {
        nome: "Almoço",
        atividades: [
          "Third Street Promenade (Lojas, músicos e artistas de rua)",
          "Santa Monica Place (Shopping de 3 andares)"
        ]
      },
      {
        nome: "Tarde",
        atividades: [
          "Venice Beach - Ocean Front Walk (Boardwalk)",
          "Venice Beach Skate Park",
          "Caminhada pelos Venice Canals",
          "Passeio na Abbot Kinney Boulevard"
        ],
        mapLink: "https://maps.google.com/?q=Venice+Beach+Skatepark"
      }
    ]
  },
  {
    dia: "10/08",
    semana: "Segunda-feira",
    titulo: "Hollywood e Observatório Griffith",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Calçada da Fama (Hollywood Walk of Fame)",
          "TCL Chinese Theatre e Dolby Theatre"
        ],
        mapLink: "https://maps.google.com/?q=Hollywood+Walk+of+Fame"
      },
      {
        nome: "Tarde",
        atividades: [
          "Vista do Letreiro de Hollywood (Hollywood Sign)",
          "Passeio pelo Griffith Park"
        ]
      },
      {
        nome: "Fim de Tarde / Noite",
        atividades: [
          "Pôr do sol no Griffith Observatory",
          "Jantar na região de West Hollywood"
        ],
        mapLink: "https://maps.google.com/?q=Griffith+Observatory"
      }
    ]
  },
  {
    dia: "11/08",
    semana: "Terça-feira",
    titulo: "Universal Studios Hollywood",
    periodos: [
      {
        nome: "Dia Inteiro",
        atividades: [
          "Parque Universal Studios (Studio Tour, Super Nintendo World, Harry Potter)",
          "Universal CityWalk (Lojas e restaurantes na saída)"
        ],
        mapLink: "https://maps.google.com/?q=Universal+Studios+Hollywood"
      }
    ]
  },
  {
    dia: "12/08",
    semana: "Quarta-feira",
    titulo: "Beverly Hills e The Grove",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Letreiro de Beverly Hills (Beverly Hills Sign)",
          "Passeio pela Rodeo Drive (Lojas de grife)"
        ],
        mapLink: "https://maps.google.com/?q=Rodeo+Drive"
      },
      {
        nome: "Tarde",
        atividades: [
          "The Original Farmers Market (Almoço)",
          "Compras e passeio no The Grove",
          "Visita ao LACMA (Los Angeles County Museum of Art) - Urban Light"
        ],
        mapLink: "https://maps.google.com/?q=The+Grove+Los+Angeles"
      }
    ]
  },
  {
    dia: "13/08",
    semana: "Quinta-feira",
    titulo: "Downtown LA",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Walt Disney Concert Hall",
          "The Broad (Museu de Arte Contemporânea)",
          "Grand Central Market (Almoço)"
        ],
        mapLink: "https://maps.google.com/?q=Grand+Central+Market"
      },
      {
        nome: "Tarde",
        atividades: [
          "Passeio por Little Tokyo",
          "Arts District"
        ]
      }
    ]
  },
  {
    dia: "14/08",
    semana: "Sexta-feira",
    titulo: "Viagem para San Diego",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Check-out no Hotel Indigo Los Angeles",
          "Viagem de carro pela costa rumo ao sul"
        ]
      },
      {
        nome: "Tarde",
        atividades: [
          "Parada em La Jolla Cove (Observação de leões marinhos e praias)",
          "Check-in no Hotel em San Diego"
        ],
        mapLink: "https://maps.google.com/?q=La+Jolla+Cove"
      }
    ]
  },
  {
    dia: "15/08",
    semana: "Sábado",
    titulo: "San Diego Zoo e Balboa Park",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "San Diego Zoo (Um dos zoológicos mais famosos do mundo)"
        ],
        mapLink: "https://maps.google.com/?q=San+Diego+Zoo"
      },
      {
        nome: "Tarde",
        atividades: [
          "Passeio pela arquitetura do Balboa Park",
          "Jardim Botânico e museus locais"
        ],
        mapLink: "https://maps.google.com/?q=Balboa+Park"
      }
    ]
  },
  {
    dia: "16/08",
    semana: "Domingo",
    titulo: "USS Midway e Gaslamp Quarter",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Visita ao porta-aviões USS Midway Museum",
          "Caminhada pela orla (Embarcadero)"
        ],
        mapLink: "https://maps.google.com/?q=USS+Midway+Museum"
      },
      {
        nome: "Tarde / Noite",
        atividades: [
          "Passeio e jantar no Gaslamp Quarter (Centro histórico vibrante de San Diego)"
        ],
        mapLink: "https://maps.google.com/?q=Gaslamp+Quarter"
      }
    ]
  },
  {
    dia: "17/08",
    semana: "Segunda-feira",
    titulo: "Coronado Beach e Seaport Village",
    periodos: [
      {
        nome: "Tarde",
        atividades: [
          "Travessia de Ferry para Coronado (bacana e barato)",
          "Coronado Beach (areia clara e faixa larguíssima)",
          "Passeio pelo lobby e áreas comuns do icônico Hotel del Coronado",
          "Pôr do Sol espetacular em Coronado!"
        ],
        mapLink: "https://maps.app.goo.gl/wdQwWv5jQ2RtWgs76"
      },
      {
        nome: "Noite",
        atividades: [
          "Jantar no Seaport Village"
        ],
        mapLink: "https://maps.google.com/?q=Seaport+Village"
      }
    ]
  },
  {
    dia: "18/08",
    semana: "Terça-feira",
    titulo: "SeaWorld e Compras em San Diego",
    periodos: [
      {
        nome: "Dia Inteiro",
        atividades: [
          "SeaWorld San Diego: Parque marinho com shows, montanhas-russas e atrações aquáticas."
        ],
        mapLink: "https://maps.app.goo.gl/gDxrwoayGTcRQrS19"
      },
      {
        nome: "Tarde/Noite (Opção Compras)",
        atividades: [
          "Las Americas Premium Outlets (20 min de Downtown)",
          "Fashion Valley Mall (Maior shopping da cidade)"
        ],
        mapLink: "https://maps.app.goo.gl/JUdUkRc1RMg2U70E9"
      }
    ]
  },
  {
    dia: "19/08",
    semana: "Quarta-feira",
    titulo: "Despedida e Praias",
    periodos: [
      {
        nome: "Livre",
        atividades: [
          "Manhã livre para últimas compras ou passeios pelas praias locais (ex: Pacific Beach)",
          "Organização das malas e check-in do voo"
        ]
      }
    ]
  },
  {
    dia: "20/08",
    semana: "Quinta-feira",
    titulo: "Retorno ao Brasil",
    periodos: [
      {
        nome: "Manhã",
        atividades: [
          "Check-out no hotel",
          "Deslocamento para o Aeroporto Internacional de San Diego (SAN)",
          "Voo de volta às 09:32h"
        ],
        mapLink: "https://maps.google.com/?q=San+Diego+International+Airport"
      }
    ]
  }
];

const PLACES_DATA = {
  lojas: [
    { nome: "Third Street Promenade", local: "Los Angeles", desc: "Três ruas fechadas para pedestres com lojas bacanas, músicos e artistas de rua.", map: "https://maps.google.com/?q=Third+Street+Promenade" },
    { nome: "Santa Monica Place", local: "Los Angeles", desc: "Shopping de três andares com diversas opções de varejo e alimentação.", map: "https://maps.google.com/?q=Santa+Monica+Place" },
    { nome: "Abbot Kinney Boulevard", local: "Los Angeles", desc: "Shopping a céu aberto. Rua cheia de lojas, galerias de arte e cafés.", map: "https://maps.google.com/?q=Abbot+Kinney+Boulevard" },
    { nome: "The Grove & Farmers Market", local: "Los Angeles", desc: "Complexo de compras charmoso ao ar livre junto de um mercado gastronômico histórico.", map: "https://maps.google.com/?q=The+Grove+Los+Angeles" },
    { nome: "Las Americas Premium Outlets", local: "San Diego", desc: "Melhor para descontos. Mais de 125 lojas (Nike, Adidas, Calvin Klein, etc).", map: "https://maps.app.goo.gl/JUdUkRc1RMg2U70E9" },
    { nome: "Fashion Valley Mall", local: "San Diego", desc: "Maior shopping da cidade. Aberto com cerca de 200 lojas (Gucci, Apple, Zara).", map: "https://maps.app.goo.gl/iFt4M9kG82VjbM..." }
  ],
  parques: [
    { nome: "Santa Monica Píer", local: "Los Angeles", desc: "Ponto final histórico da Rota 66, repleto de atrações clássicas.", map: "https://maps.google.com/?q=Santa+Monica+Pier" },
    { nome: "Pacific Park", local: "Los Angeles", desc: "Parque de diversões no píer com roda gigante movida a energia solar.", map: "https://maps.google.com/?q=Pacific+Park" },
    { nome: "Venice Beach & Skate Park", local: "Los Angeles", desc: "Praia icônica com o calçadão movimentado e uma das pistas de skate mais famosas do mundo.", map: "https://maps.google.com/?q=Venice+Beach" },
    { nome: "Universal Studios Hollywood", local: "Los Angeles", desc: "Parque temático gigante com estúdios de cinema reais e atrações imersivas.", map: "https://maps.google.com/?q=Universal+Studios+Hollywood" },
    { nome: "Coronado Beach & Hotel del Coronado", local: "San Diego", desc: "Uma das praias mais lindas dos EUA, areia clara e o icônico e imponente hotel.", map: "https://maps.google.com/?q=Coronado+Beach" },
    { nome: "SeaWorld San Diego", local: "San Diego", desc: "Parque marinho com shows, montanhas-russas e atrações aquáticas.", map: "https://maps.app.goo.gl/gDxrwoayGTcRQrS19" },
    { nome: "Balboa Park", local: "San Diego", desc: "Amplo parque cultural abrigando dezenas de museus, jardins deslumbrantes e o zoológico.", map: "https://maps.google.com/?q=Balboa+Park" }
  ]
};

// --- COMPONENTES DA INTERFACE ---

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-08-08T21:45:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-900 text-stone-50 p-4 rounded-xl shadow-lg mb-6 flex justify-between text-center items-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{timeLeft.dias}</span>
        <span className="text-xs text-blue-200 uppercase tracking-wider">Dias</span>
      </div>
      <span className="text-2xl font-bold text-blue-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{timeLeft.horas.toString().padStart(2, '0')}</span>
        <span className="text-xs text-blue-200 uppercase tracking-wider">Horas</span>
      </div>
      <span className="text-2xl font-bold text-blue-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{timeLeft.min.toString().padStart(2, '0')}</span>
        <span className="text-xs text-blue-200 uppercase tracking-wider">Min</span>
      </div>
      <span className="text-2xl font-bold text-blue-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{timeLeft.seg.toString().padStart(2, '0')}</span>
        <span className="text-xs text-orange-400 uppercase tracking-wider">Seg</span>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="relative h-64 bg-slate-800 rounded-b-3xl overflow-hidden shadow-md">
    <img 
      src="https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&q=80&w=1200&h=600" 
      alt="California" 
      className="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full p-6 text-stone-50">
      <h1 className="text-3xl font-bold mb-1">Roteiro Dária</h1>
      <p className="text-blue-200 flex items-center font-medium">
        <MapPin size={16} className="mr-1 text-orange-400" /> Los Angeles & San Diego
      </p>
    </div>
  </div>
);

const RoteiroTab = () => {
  const [expandedDay, setExpandedDay] = useState("09/08");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
        <CalendarDays className="mr-2 text-orange-500" /> Linha do Tempo
      </h2>
      
      <div className="space-y-4">
        {ITINERARY_DATA.map((item, idx) => {
          const isExpanded = expandedDay === item.dia;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setExpandedDay(isExpanded ? null : item.dia)}
                className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="text-left">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-blue-900">{item.dia}</span>
                    <span className="text-sm font-medium text-slate-500">{item.semana}</span>
                  </div>
                  <h3 className="text-slate-700 font-medium mt-1">{item.titulo}</h3>
                </div>
                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                  <div className="relative border-l-2 border-orange-200 ml-3 pl-5 space-y-6 mt-4">
                    {item.periodos.map((periodo, pIdx) => (
                      <div key={pIdx} className="relative">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white shadow-sm"></div>
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                          <Clock size={14} className="mr-1 text-slate-400" /> {periodo.nome}
                        </h4>
                        <ul className="space-y-2 mb-3">
                          {periodo.atividades.map((ativ, aIdx) => (
                            <li key={aIdx} className="text-sm text-slate-600 leading-relaxed flex items-start">
                              <span className="text-orange-500 mr-2 mt-1">•</span>
                              {ativ}
                            </li>
                          ))}
                        </ul>
                        {periodo.mapLink && (
                          <a 
                            href={periodo.mapLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-2 rounded-lg"
                          >
                            <Map size={12} className="mr-1" /> Rota no Mapa
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PassagensTab = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    <h2 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
      <Plane className="mr-2 text-orange-500" /> Passagens Aéreas
    </h2>

    <div className="space-y-6">
      {/* VOO IDA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Voo de Ida</span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{FLIGHTS_DATA.ida.data}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-slate-500">Voo</span>
              <p className="font-bold text-blue-900">{FLIGHTS_DATA.ida.voo}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 bg-slate-50 p-4 rounded-lg">
            <div className="text-center w-1/3">
              <p className="text-2xl font-black text-blue-900">{FLIGHTS_DATA.ida.horario}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{FLIGHTS_DATA.ida.origem}</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full h-[2px] bg-slate-300 relative">
                <Plane size={16} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-400 rotate-45 bg-slate-50 px-1" />
              </div>
            </div>
            <div className="text-center w-1/3">
              <p className="text-2xl font-black text-blue-900">Chegada</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{FLIGHTS_DATA.ida.destino}</p>
            </div>
          </div>
        </div>
      </div>

      {/* VOO VOLTA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded-md">Voo de Volta</span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{FLIGHTS_DATA.volta.data}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-slate-500">Voo</span>
              <p className="font-bold text-blue-900">{FLIGHTS_DATA.volta.voo}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 bg-slate-50 p-4 rounded-lg">
            <div className="text-center w-1/3">
              <p className="text-2xl font-black text-blue-900">{FLIGHTS_DATA.volta.horario}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{FLIGHTS_DATA.volta.origem}</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full h-[2px] bg-slate-300 relative">
                <Plane size={16} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-400 rotate-45 bg-slate-50 px-1" />
              </div>
            </div>
            <div className="text-center w-1/3">
              <p className="text-2xl font-black text-blue-900">Chegada</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{FLIGHTS_DATA.volta.destino}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PASSAGEIROS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h4 className="font-bold text-blue-900 mb-4 border-b border-slate-100 pb-2">Passageiros & Assentos</h4>
        <div className="space-y-3">
          {FLIGHTS_DATA.passageiros.map((pax, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">
                  {pax.nome.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{pax.nome}</p>
                  <p className="text-xs text-slate-500">Loc: {pax.localizador}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Assento</span>
                <span className="font-bold text-orange-600">{pax.assento}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HospedagemTab = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    <h2 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
      <BedDouble className="mr-2 text-orange-500" /> Hospedagem
    </h2>

    <div className="space-y-6">
      {HOTELS_DATA.map((hotel, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-40 overflow-hidden relative">
            <img src={hotel.imagem} alt={hotel.nome} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-blue-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
              {hotel.checkin} a {hotel.checkout}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2">{hotel.nome}</h3>
            <p className="text-sm text-slate-600 mb-4">{hotel.descricao}</p>
            
            <div className="flex items-start mb-5 bg-slate-50 p-3 rounded-lg">
              <MapPin size={18} className="text-slate-400 mr-2 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-700">{hotel.endereco}</span>
            </div>

            <a 
              href={hotel.mapLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-xl"
            >
              <ExternalLink size={18} className="mr-2" />
              Abrir no Google Maps
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ExplorarTab = () => {
  const [subTab, setSubTab] = useState('lojas'); // 'lojas' | 'parques'
  
  const currentData = subTab === 'lojas' ? PLACES_DATA.lojas : PLACES_DATA.parques;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
        <Compass className="mr-2 text-orange-500" /> Explorar Atrações
      </h2>

      {/* Toggles */}
      <div className="flex p-1 bg-slate-200 rounded-xl mb-6">
        <button 
          onClick={() => setSubTab('lojas')}
          className={`flex-1 flex justify-center items-center py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'lojas' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
        >
          <ShoppingBag size={16} className="mr-2" /> Lojas & Malls
        </button>
        <button 
          onClick={() => setSubTab('parques')}
          className={`flex-1 flex justify-center items-center py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'parques' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
        >
          <TreePine size={16} className="mr-2" /> Parques & Praias
        </button>
      </div>

      <div className="space-y-4">
        {currentData.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-blue-900 text-lg">{item.nome}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded">
                {item.local}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.desc}</p>
            <a 
              href={item.map} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              <MapPin size={16} className="mr-1" /> Como chegar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoTab = () => {
  const [subTab, setSubTab] = useState('contatos');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
        <AlertCircle className="mr-2 text-orange-500" /> Informações Úteis
      </h2>

      <div className="flex p-1 bg-slate-200 rounded-xl mb-6">
        <button 
          onClick={() => setSubTab('contatos')}
          className={`flex-1 flex justify-center items-center py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'contatos' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
        >
          <Phone size={16} className="mr-2" /> Contatos
        </button>
        <button 
          onClick={() => setSubTab('dicas')}
          className={`flex-1 flex justify-center items-center py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'dicas' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
        >
          <Info size={16} className="mr-2" /> Dicas
        </button>
      </div>

      {subTab === 'contatos' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Emergência (EUA)</h3>
            <p className="text-2xl font-black text-red-600 flex items-center">
              <Phone size={24} className="mr-2" /> 911
            </p>
            <p className="text-xs text-slate-500 mt-1">Polícia, Bombeiros e Ambulância</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Seguro Viagem</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold text-slate-600">Apólice:</span> 123456789</p>
              <p className="text-sm"><span className="font-semibold text-slate-600">Telefone:</span> +1 800 555 0199</p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'dicas' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Checklist Rápido</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-green-500 mr-2 shrink-0" /> Passaporte e Visto Americano válidos
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-green-500 mr-2 shrink-0" /> Adaptador de tomada padrão EUA
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-green-500 mr-2 shrink-0" /> Cartão de crédito global (Nomad/Wise)
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-green-500 mr-2 shrink-0" /> Chip de internet internacional
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};


// --- APLICAÇÃO PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('roteiro');

  const renderContent = () => {
    switch (activeTab) {
      case 'roteiro': return <RoteiroTab />;
      case 'passagens': return <PassagensTab />;
      case 'hospedagem': return <HospedagemTab />;
      case 'explorar': return <ExplorarTab />;
      case 'info': return <InfoTab />;
      default: return <RoteiroTab />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-900 pb-24">
      {/* Container Principal otimizado para Mobile com Max-Width para Desktop */}
      <div className="max-w-md mx-auto bg-stone-50 min-h-screen relative shadow-2xl">
        
        <Header />
        
        <div className="p-5 -mt-8 relative z-10">
          {activeTab === 'roteiro' && <Countdown />}
          {renderContent()}
        </div>

        {/* BOTTOM NAVIGATION (Sticky) */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="max-w-md mx-auto bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] px-2 py-2 pb-safe flex justify-between items-center rounded-t-2xl">
            <NavButton 
              icon={<CalendarDays size={22} />} 
              label="Roteiro" 
              isActive={activeTab === 'roteiro'} 
              onClick={() => setActiveTab('roteiro')} 
            />
            <NavButton 
              icon={<Compass size={22} />} 
              label="Explorar" 
              isActive={activeTab === 'explorar'} 
              onClick={() => setActiveTab('explorar')} 
            />
            
            {/* Botão Central de Destaque para Voos/Passagens */}
            <div className="flex flex-col items-center justify-center -mt-8">
              <button 
                onClick={() => setActiveTab('passagens')}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-105 ${activeTab === 'passagens' ? 'bg-orange-500 text-white' : 'bg-blue-900 text-white border-4 border-stone-50'}`}
              >
                <Plane size={24} className={activeTab === 'passagens' ? 'animate-bounce' : ''} />
              </button>
              <span className={`text-[10px] mt-1 font-bold ${activeTab === 'passagens' ? 'text-orange-600' : 'text-slate-500'}`}>Vôos</span>
            </div>

            <NavButton 
              icon={<BedDouble size={22} />} 
              label="Hotel" 
              isActive={activeTab === 'hospedagem'} 
              onClick={() => setActiveTab('hospedagem')} 
            />
            <NavButton 
              icon={<Info size={22} />} 
              label="Info" 
              isActive={activeTab === 'info'} 
              onClick={() => setActiveTab('info')} 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Componente utilitário para o menu de navegação
const NavButton = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all ${isActive ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`mb-1 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
      {icon}
    </div>
    <span className={`text-[10px] transition-all duration-300 ${isActive ? 'font-black' : 'font-medium'}`}>
      {label}
    </span>
  </button>
);