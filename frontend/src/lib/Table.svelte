<script>
    let {
        data = [],
        columns = [],
        pageSize = 10,
        showActions = true,
        onAdd,
        onEdit,
        onDelete
    } = $props();

    // stateهای reactive
    let currentPage = $state(1);
    let searchTerm = $state('');
    let sortColumn = $state('');
    let sortDirection = $state('asc'); // 'asc' or 'desc'

    // داده‌های فیلتر شده و مرتب شده
    let filteredAndSortedData = $derived(() => {
        let result = [...data];

        // جستجو
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                columns.some(col =>
                    String(item[col.key] || '').toLowerCase().includes(term)
                )
            );
        }

        // مرتب‌سازی
        if (sortColumn) {
            result.sort((a, b) => {
                const aVal = a[sortColumn];
                const bVal = b[sortColumn];
                
                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    });

    let paginatedData = $state([]); 
    // صفحه‌بندی
    // let paginatedData = $derived(() => {
    //     const startIndex = (currentPage - 1) * pageSize;
    //     return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
    // });

    $effect(() => {
        paginatedData = [];
        const startIndex = (currentPage - 1) * pageSize;
        paginatedData = filteredAndSortedData().slice(startIndex, startIndex + pageSize);
        // paginatedData = data 
    });


    // اطلاعات صفحه‌بندی
    let totalPages = $derived(Math.ceil(filteredAndSortedData().length / pageSize));
    let totalItems = $derived(filteredAndSortedData().length);
    let showingFrom = $derived((currentPage - 1) * pageSize + 1);
    let showingTo = $derived(Math.min(currentPage * pageSize, totalItems));

    // توابع
    function handleSort(columnKey) {
        if (sortColumn === columnKey) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = columnKey;
            sortDirection = 'asc';
        }
    }

    function handlePageChange(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function handleAdd() {
        onAdd?.();
    }

    function handleEdit(item) {
        onEdit?.(item);
    }

    function handleDelete(item) {
        if (confirm(`آیا از حذف این آیتم مطمئن هستید؟`)) {
            onDelete?.(item);
        }
    }

    // وقتی داده‌ها تغییر می‌کنند به صفحه اول برو
    $effect(() => {
        currentPage = 1;
    });
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- هدر جدول - جستجو و دکمه افزودن -->
    <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <!-- جستجو -->
        <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
            </div>
            <input
                type="text"
                bind:value={searchTerm}
                placeholder="جستجو..."
                class="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>

        <!-- دکمه افزودن -->
        {#if showActions && onAdd}
            <button
                onclick={handleAdd}
                class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                <i class="fas fa-plus"></i>
                افزودن جدید
            </button>
        {/if}
    </div>

    <!-- جدول -->
    <div class="overflow-x-auto">
        <table class="w-full">
            <!-- هدر جدول -->
            <thead class="bg-gray-50">
                <tr>
                    {#each columns as column}
                        <th 
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                            onclick={() => handleSort(column.key)}
                        >
                            <div class="flex items-center justify-end gap-2">
                                {column.title}
                                {#if sortColumn === column.key}
                                    <i class="fas {sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'} text-blue-500 text-xs"></i>
                                {:else}
                                    <i class="fas fa-sort text-gray-300 text-xs"></i>
                                {/if}
                            </div>
                        </th>
                    {/each}
                    {#if showActions}
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            عملیات
                        </th>
                    {/if}
                </tr>
            </thead>

            <!-- بدنه جدول -->
            <tbody class="bg-white divide-y divide-gray-200">
                {#each paginatedData as item, index (item.id || index)}
                    <tr class="hover:bg-gray-50 transition-colors">
                        {#each columns as column}
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {#if column.render}
                                    {@render column.render(item)}
                                {:else}
                                    {item[column.key]}
                                {/if}
                            </td>
                        {/each}
                        
                        {#if showActions}
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center gap-2 justify-end">
                                    {#if onEdit}
                                        <button
                                            onclick={() => handleEdit(item)}
                                            class="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                                            title="ویرایش"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    {/if}
                                    {#if onDelete}
                                        <button
                                            onclick={() => handleDelete(item)}
                                            class="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                                            title="حذف"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    {/if}
                                </div>
                            </td>
                        {/if}
                    </tr>
                {:else}
                    <tr>
                        <td colspan={columns.length + (showActions ? 1 : 0)} class="px-6 py-8 text-center text-gray-500">
                            <div class="flex flex-col items-center gap-2">
                                <i class="fas fa-inbox text-3xl text-gray-300"></i>
                                <p>داده‌ای برای نمایش وجود ندارد</p>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- فوتر - اطلاعات صفحه‌بندی -->
    <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <!-- اطلاعات نمایش -->
        <div class="text-sm text-gray-700">
            نمایش 
            <span class="font-medium">{showingFrom}</span>
            تا 
            <span class="font-medium">{showingTo}</span>
            از 
            <span class="font-medium">{totalItems}</span>
            نتیجه
        </div>

        <!-- کنترل‌های صفحه‌بندی -->
        {#if totalPages > 1}
        
            <div class="flex items-center gap-2">
                <!-- دکمه قبلی -->
                <button
                    onclick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <i class="fas fa-chevron-right"></i>
                </button>

                <!-- صفحات -->
                {#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                        pageNum = i + 1;
                    } else if (currentPage <= 3) {
                        pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                    } else {
                        pageNum = currentPage - 2 + i;
                    }
                    return pageNum;
                }) as pageNum}
                    <button
                        onclick={() => handlePageChange(pageNum)}
                        class="px-3 py-1 border border-gray-300 rounded {currentPage === pageNum ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50'} transition-colors"
                    >
                        {pageNum}
                    </button>
                {/each}

                <!-- دکمه بعدی -->
                <button
                    onclick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>
        {/if}
    </div>
</div>