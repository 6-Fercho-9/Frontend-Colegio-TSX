// // components/tables/CustomTransactionTable.tsx
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import Badge from "../../components/ui/badge/Badge";
// import Pagination from "../Tables/PaginacionT";

// interface Transaction {
//   id: number;
//   name: string;
//   date: string;
//   price: string;
//   category: string;
//   status: "Success" | "Pending" | "Failed";
// }

// const transactionData: Transaction[] = [
//   {
//     id: 1,
//     name: "Bought PYPL",
//     date: "Nov 23, 01:00 PM",
//     price: "$2,567.88",
//     category: "Finance",
//     status: "Success",
//   },
//   {
//     id: 2,
//     name: "Bought AAPL",
//     date: "Nov 22, 09:00 PM",
//     price: "$2,567.88",
//     category: "Technology",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     name: "Sell KKST",
//     date: "Oct 12, 03:54 PM",
//     price: "$6,754.99",
//     category: "Finance",
//     status: "Success",
//   },
//   {
//     id: 4,
//     name: "Bought FB",
//     date: "Sep 09, 02:00 AM",
//     price: "$1,445.41",
//     category: "Social media",
//     status: "Success",
//   },
//   {
//     id: 5,
//     name: "Sell AMZN",
//     date: "Feb 35, 08:00 PM",
//     price: "$5,698.55",
//     category: "E-commerce",
//     status: "Failed",
//   },
// ];

// const TestingPage = () => {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <Table>
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Name
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Date
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Price
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Category
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHeader>
//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {transactionData.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
//                   {item.name}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {item.date}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {item.price}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {item.category}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-start">
//                   <Badge
//                     size="sm"
//                     color={
//                       item.status === "Success"
//                         ? "success"
//                         : item.status === "Pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   >
//                     {item.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="p-4">
//         <Pagination totalPages={10} currentPage={1} />
//       </div>
//     </div>
//   );
// };

//export default TestingPage;