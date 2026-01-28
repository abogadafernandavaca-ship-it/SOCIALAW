
import { FundingProposal } from './types';

export const COLORS = {
  navy: '#002147',
  pink: '#fbcfe8',
  orange: '#fdba74',
  lavender: '#ddd6fe',
  bg: '#fffaff'
};

export const MOCK_DATA: FundingProposal[] = [
  { id: "01", org: "UN Trust Fund (ONU Mujeres)", activo: "J-Móvil Blueprint", monto: 350000, email: "untrustfund.evaw@unwomen.org", estado: "SENT", date: "2024-01-15" },
  { id: "02", org: "Unearthodox Exploration", activo: "J-Móvil Blueprint", monto: 75000, email: "hello@unearthodox.org", estado: "SENT", date: "2024-01-20" },
  { id: "03", org: "EREF (Env. Research)", activo: "J-Móvil Blueprint", monto: 195000, email: "proposals@erefdn.org", estado: "SENT", date: "2024-02-05" },
  { id: "19", org: "CIVICUS (Digital Democracy)", activo: "J-Móvil Blueprint", monto: 15000, email: "damilola@civicus.org", estado: "DECLINED", date: "2024-02-10" },
  { id: "20", org: "Internet Freedom Fund (OTF)", activo: "J-Móvil Blueprint", monto: 150000, email: "support@opentech.fund", estado: "SENT", date: "2024-02-12" },
  { id: "22", org: "Fellowship Halcyon", activo: "Global Educator", monto: 0, email: "fellowships@halcyon.org", estado: "DECLINED", date: "2024-02-15" },
  { id: "24", org: "L'Oréal Fund for Women", activo: "Refugio Raíces", monto: 293237, email: "fundforwomen@loreal.com", estado: "SENT", date: "2024-03-01" },
  { id: "25", org: "Latam Health Champions (FII)", activo: "J-Móvil Health", monto: 200000, email: "carlos@innos.co", estado: "SENT", date: "2024-03-05" },
  { id: "26", org: "BID (Registro Proveedor)", activo: "Socialaw S.A.S.", monto: 0, email: "suppliers@iadb.org", estado: "SUCCESS", date: "2024-03-10" },
  { id: "27", org: "BID Honduras (HO-T1467)", activo: "J-Móvil Blueprint", monto: 70000, email: "nidiah@iadb.org", estado: "SUCCESS", date: "2024-03-15" },
];
