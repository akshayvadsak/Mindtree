// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icons Imports

// ** Type Import
import { CardStatsCharacterProps } from "src/@core/components/card-statistics/types";

// ** Custom Components Imports
import CardStatisticsCharacter from "src/@core/components/card-statistics/card-stats-with-image";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import { useEffect, useState } from "react";

const data: CardStatsCharacterProps[] = [
  {
    stats: "13.7k",
    title: "Ratings",
    trendNumber: "+38%",
    chipColor: "primary",
    chipText: "Year of 2022",
    src: "/images/cards/pose_f9.png",
  },
  {
    stats: "24.5k",
    trend: "negative",
    title: "Sessions",
    trendNumber: "-22%",
    chipText: "Last Week",
    chipColor: "secondary",
    src: "/images/cards/pose_m18.png",
  },
];

const CRMDashboard = () => {
  const [data, setData] = useState<any>({
    countCompany: 0,
    countUser: 0,
  });

  const {role, company_id}: any = JSON.parse(localStorage.getItem("userData") || "");
  // const userRole = JSON.parse(userData)?.role;
  const fetchDashboardData = async () => {
    try {
      const res = await fetch(
        "http://54.226.108.109:3000/admin/dashboard/page",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ROLE: role,
            COMPANY_ID: company_id,
          }),
        }
      );
      if (res.status === 200) {
        const result = await res.json();
        setData({ ...result.data });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ pt: (theme) => `${theme.spacing(12.25)} !important` }}
        >
          
          {role === 'ADMIN' ? <CardStatisticsCharacter
            data={data.countCompany}
            title="Total Companies"
            src="/images/company.png"
          />: null}
          {role === 'COMPANY' ? <CardStatisticsCharacter
            data={data.countStep}
            title="Total Trees planted"
            src="/images/treeuser.png"  // change img
          /> : null}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ pt: (theme) => `${theme.spacing(12.25)} !important` }}
        >

       <CardStatisticsCharacter
            data={data.countUser}
            title="Total Users"
            src="/images/users.png"
          /> 
        </Grid>

        
      </Grid>
    </ApexChartWrapper>
  );
};

export default CRMDashboard;
