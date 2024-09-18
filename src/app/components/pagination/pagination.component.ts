import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems!: number; 
  @Input() itemsPerPage!: number; 
  @Input() currentPage: number = 1; 

  @Output() pageChange = new EventEmitter<number>(); 

  totalPages: number = 0; 
  pages: (number | string)[] = []; 
  maxVisiblePages: number = 7; 

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
  }

  generatePages() {
    const pagesArray: (number | string)[] = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      const startPage = Math.max(2, this.currentPage - 1); 
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 1); 

      pagesArray.push(1);

      if (this.currentPage <= 3) {
        for (let i = 2; i <= 5; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
      } 
      else if (this.currentPage >= this.totalPages - 2) {
        pagesArray.push('...');
        for (let i = this.totalPages - 4; i < this.totalPages; i++) {
          pagesArray.push(i);
        }
      } 
      else {
        pagesArray.push('...');
        for (let i = startPage; i <= endPage; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
      }

      pagesArray.push(this.totalPages);
    }


    this.pages = pagesArray;
  }

  changePage(page: number | string) {
    if (typeof page === 'number' && page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page); 
    }
  }
}
