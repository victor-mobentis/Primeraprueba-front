import { Component, Input } from '@angular/core';
import { Color } from 'chart.js';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.css']
})
export class ProgressCircleComponent {
  @Input() total: number = 1;
  @Input() value: number = 1;
  @Input() color: Color = "#ffffff";
  @Input() text: string = "";
  @Input() backgroundColor: Color = "#ffffff";


  // const formatToK = (value) => {
  //   return Math.round(value / 1000) + 'k';
  // };
  
  // const ProgressCircle = ({ value, total, color, text, innerColor }) => {
  //   const [isHovered, setIsHovered] = useState(false);
  
  //   // Calcular el porcentaje
  //   const percent = Math.round((value / total) * 100);
  
  //   return (
  //     <div
  //       className="progress-circle-container"
  //       onMouseEnter={() => setIsHovered(true)}
  //       onMouseLeave={() => setIsHovered(false)}
  //     >
  //       <div
  //         className="progress-circle"
  //         style={{ '--percent': percent, '--color': color, '--inner-color': innerColor }}
  //       >
  //         {/* Mostrar porcentaje o valor formateado según el estado de hover */}
  //         <div className={`progress-text ${isHovered ? 'hidden' : ''}`}>
  //           {percent}%
  //         </div>
  //         <div className="progress-value">
  //           {isHovered ? formatToK(value) : text}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  
}
